import { type FC, useCallback, useEffect, useMemo, useRef } from 'react'
import { Controller, type ControllerProps, type FieldError, useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './vk-video-format'
import './rutube-video-format'

import styled from 'styled-components'

interface QuillEditorProps extends Omit<ControllerProps, 'render'> {
	name: string
	rules?: ControllerProps['rules']
	dynamicError?: FieldError | undefined
	label?: string
	className?: string
}

type StyledEditorWrapperProps = {
	$heightEditor?: string
	$maxWidth?: string
	$width?: string
}

const StyledEditorWrapper = styled.div<StyledEditorWrapperProps>`
	label {
		display: block;
		font-size: 14px;
		font-family: 'Open Sans', sans-serif;
		font-weight: 600;
		margin-bottom: 5px;
	}

	.quill {
		width: ${({ $width }) => $width ?? '100%'};
		max-width: ${({ $maxWidth }) => $maxWidth ?? 'none'};
		height: ${({ $heightEditor }) => $heightEditor ?? '750px'};
		min-width: 320px;
		min-height: 250px;
		resize: both;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.ql-snow {
		border: 1px solid #afafaf;
		font-family: 'Open Sans', sans-serif;
		font-size: 14px;
	}

	.quillCustomToolbar {
		border: 1px solid #afafaf;
		border-bottom: none;
		border-radius: 3px 3px 0 0;
		font-family: 'Open Sans', sans-serif;
	}

	.quillCustomToolbar .ql-typography {
		width: auto;
		min-width: 48px;
		padding: 0 8px;
		font-size: 12px;
		font-weight: 700;
	}

	.quillCustomToolbar .ql-typography:hover {
		color: #06c;
	}

	.ql-toolbar {
		border-radius: 3px 3px 0 0;
		width: 100%;
		flex-shrink: 0;
	}

	.ql-container {
		border-radius: 0 0 3px 3px;
		width: 100%;
		flex: 1;
		min-height: 0;
		overflow: hidden;
	}

	.ql-editor {
		height: 100%;
		overflow-y: auto;
		white-space: pre-wrap;
	}

	.ql-snow .ql-tooltip[data-mode='video']::before {
		content: 'Вставьте код вставки плеера';
	}

	.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
		content: 'Сохранить';
	}

	.warningMessage {
		color: #f00000;
		font-size: 14px;
		line-height: 1;
		padding-top: 5px;
	}

	iframe {
		display: block;
		margin: 1em 0;
		max-width: 100%;
		border-radius: 4px;
	}

	.vk-video-container {
		margin: 1em 0;
		width: 100%;
		min-height: 400px;
		background: #f5f5f5;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.rutube-video-container {
		margin: 1em 0;
		width: 100%;
		position: relative;
		padding-bottom: 56.25%;
		height: 0;
		overflow: hidden;
		border-radius: 4px;
	}

	.rutube-video-container iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		margin: 0;
	}
`

const formats = [
	'header',
	'bold',
	'italic',
	'underline',
	'strike',
	'list',
	'bullet',
	'link',
	'image',
	'video',
	'vk-video',
	'rutube-video',
]

const typographyText = (text: string) => {
	return text
		.replace(/"([^"]+)"/g, '«$1»')
		.replace(/„([^“]+)“/g, '«$1»')
		.replace(/\.{3}/g, '…')
		.replace(/--/g, '—')
		.replace(/\s[-–]\s/g, ' — ')
}

const typographyHtml = (html: string) => {
	if (typeof DOMParser === 'undefined') {
		return html
	}

	const parser = new DOMParser()
	const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html')
	const root = doc.body.firstElementChild

	if (!root) return html

	const walk = (node: Node) => {
		if (node.nodeType === Node.TEXT_NODE) {
			node.textContent = typographyText(node.textContent ?? '')
			return
		}

		node.childNodes.forEach(walk)
	}

	walk(root)

	return root.innerHTML
}

const processVideoEmbeds = (html: string) => {
	return html.replace(
		/<iframe[^>]*src="([^"]*)"[^>]*><\/iframe>|<iframe[^>]*src="([^"]*)"[^>]*>/g,
		(_match: string, srcWithClosing: string, srcWithoutClosing: string) => {
			const src = srcWithClosing || srcWithoutClosing

			if (src.includes('vkvideo.ru')) {
				try {
					const urlMatch = src.match(/video_ext\.php\?oid=([^&]+)&id=(\d+)/)

					if (urlMatch) {
						const oid = urlMatch[1]
						const id = urlMatch[2]

						return `<div class="vk-video-container"><div id="vk_video_${oid}_${id}"></div></div>`
					}
				} catch (e) {
					console.error('Error processing VK video:', e)
				}
			}

			return `<iframe src="${src}" frameborder="0" allowfullscreen="true" width="100%" height="400"></iframe>`
		},
	)
}

export const QuillEditor: FC<QuillEditorProps & StyledEditorWrapperProps> = ({
	name,
	rules,
	dynamicError,
	label,
	$heightEditor,
	$maxWidth,
	$width,
	className,
	...rest
}) => {
	const {
		control,
		formState: { errors },
	} = useFormContext()

	const vkScriptLoaded = useRef(false)
	const editorRef = useRef<ReactQuill>(null)
	const fieldOnChangeRef = useRef<((value: string) => void) | null>(null)
	const toolbarId = useRef(`quill-toolbar-${Math.random().toString(36).slice(2)}`).current

	const applyTypography = useCallback(() => {
		const quill = editorRef.current?.getEditor()

		if (!quill) return

		const selection = quill.getSelection()
		const html = quill.root.innerHTML
		const typographyProcessedHtml = typographyHtml(html)
		const processedHtml = processVideoEmbeds(typographyProcessedHtml)

		quill.clipboard.dangerouslyPasteHTML(processedHtml)
		fieldOnChangeRef.current?.(processedHtml)

		requestAnimationFrame(() => {
			if (selection) {
				quill.setSelection(selection.index, selection.length)
			}
		})
	}, [])

	const modules = useMemo(
		() => ({
			toolbar: {
				container: `#${toolbarId}`,
				handlers: {
					typography: applyTypography,
				},
			},
			clipboard: {
				matchVisual: false,
			},
		}),
		[applyTypography, toolbarId],
	)

	useEffect(() => {
		if (!vkScriptLoaded.current) {
			const script = document.createElement('script')
			script.src = 'https://vk.com/js/api/openapi.js?169'
			script.async = true
			script.onload = () => {
				vkScriptLoaded.current = true
			}
			document.head.appendChild(script)
		}
	}, [])

	useEffect(() => {
		if (window.VK?.Widgets) {
			document.querySelectorAll('.vk-video-container div[id^="vk_video_"]').forEach((element) => {
				const id = element.id
				const [oid, videoId] = id.split('_').slice(-2)
				const widgetId = `vk_video_${oid}_${videoId}`

				element.id = widgetId

				window.VK?.Widgets?.Video(widgetId, {
					width: '100%',
					height: 400,
					video: `${oid}_${videoId}`,
				})
			})
		}
	}, [control._formValues[name]])

	useEffect(() => {
		if (editorRef.current) {
			const editor = editorRef.current.getEditor()
			editor.root.setAttribute('data-placeholder', 'Введите текст...')

			const intervalId = setInterval(() => {
				const videoTooltip = document.querySelector('.ql-tooltip[data-mode="video"] input')

				if (videoTooltip) {
					videoTooltip.setAttribute('placeholder', 'Код плеера...')
				}
			}, 100)

			return () => {
				clearInterval(intervalId)
			}
		}
	}, [])

	return (
		<StyledEditorWrapper
			$heightEditor={$heightEditor}
			$maxWidth={$maxWidth}
			$width={$width}
			className={className}
		>
			{label && <label>{label}</label>}

			<Controller
				name={name}
				control={control}
				rules={rules}
				render={({ field }) => {
					fieldOnChangeRef.current = field.onChange

					const handleChange = (
						_content: string,
						_delta: unknown,
						_source: string,
						editor: { getHTML: () => string },
					) => {
						const html = editor.getHTML()
						const processedHtml = processVideoEmbeds(html)

						field.onChange(processedHtml)
					}

					return (
						<>
							<div id={toolbarId} className='quillCustomToolbar'>
								<select className='ql-header' defaultValue=''>
									<option value='1' />
									<option value='2' />
									<option value='3' />
									<option value='4' />
									<option value='5' />
									<option value='6' />
									<option value='' />
								</select>

								<button type='button' className='ql-bold' />
								<button type='button' className='ql-italic' />
								<button type='button' className='ql-underline' />
								<button type='button' className='ql-strike' />

								<button type='button' className='ql-list' value='ordered' />
								<button type='button' className='ql-list' value='bullet' />

								<button type='button' className='ql-link' />
								<button type='button' className='ql-image' />
								<button type='button' className='ql-video' />

								<button type='button' className='ql-typography'>
									Typo
								</button>

								<button type='button' className='ql-clean' />
							</div>

							<ReactQuill
								{...field}
								{...rest}
								ref={editorRef}
								modules={modules}
								formats={formats}
								onChange={handleChange}
								value={field.value || ''}
								preserveWhitespace
							/>
						</>
					)
				}}
			/>

			{dynamicError && <p className='warningMessage'>{dynamicError.message}</p>}

			{errors[name] && (
				<p className='warningMessage'>
					<ErrorMessage errors={errors} name={name} />
				</p>
			)}
		</StyledEditorWrapper>
	)
}
