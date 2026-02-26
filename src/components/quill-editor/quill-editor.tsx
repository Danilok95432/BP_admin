import { type FC, useEffect, useRef } from 'react'
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

	.ql-snow {
		border: 1px solid #afafaf;
		font-family: 'Open Sans', sans-serif;
		font-size: 14px;
	}

	.ql-toolbar {
		border-radius: 3px 3px 0 0;
		max-width: ${({ $maxWidth }) => $maxWidth ?? 'auto'};
		width: ${({ $width }) => $width ?? '100%'};
	}

	.ql-container {
		border-radius: 0 0 3px 3px;
		height: ${({ $heightEditor }) => $heightEditor ?? '750px'};
		max-width: ${({ $maxWidth }) => $maxWidth ?? 'auto'};
		width: ${({ $width }) => $width ?? '100%'};
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
		padding-bottom: 56.25%; /* 16:9 */
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

const modules = {
	toolbar: [
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		['bold', 'italic', 'underline', 'strike'],
		[{ list: 'ordered' }, { list: 'bullet' }],
		['link', 'image', 'video'],
		['clean'],
	],
	clipboard: {
		matchVisual: false,
	},
}

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
	const previousValue = useRef<string>('')
	const editorRef = useRef<ReactQuill>(null)

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
					const handleChange = (
						content: string,
						delta: unknown,
						source: string,
						editor: { getHTML: () => string },
					) => {
						const html = editor.getHTML()
						const cleanHtml = html.replace(/&quot;/g, '"')
						const cleanHtmlWithoutTrailing = cleanHtml
							.replace(/>\s*$/, '')
							.replace(/<\/iframe>\s*$/, '')
							.replace(/>\s*<\/p>$/, '</p>')
							.replace(/"&gt;/, '')
							.trim()

						const processedHtml = cleanHtmlWithoutTrailing.replace(
							/<iframe[^>]*src="([^"]*)"[^>]*>/g,
							(_match: string, src: string) => {
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

						if (processedHtml !== previousValue.current) {
							previousValue.current = processedHtml
							field.onChange(processedHtml)
						}
					}

					const initialValue = field.value ? `${field.value}<p><br></p>` : '<p><br></p>'

					return (
						<ReactQuill
							{...field}
							{...rest}
							ref={editorRef}
							modules={modules}
							formats={formats}
							onChange={handleChange}
							value={initialValue}
						/>
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
