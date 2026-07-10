import { useState, useRef } from "react"

import { Box, Flex, Text } from "@radix-ui/themes"

import CimoLogo from "@/components/CimoLogo"
import SettingsPanel from "@/components/SettingsPanel"
import DropZone from "@/components/Dropzone"
import OptimizationResult from "@/components/OptimizationResult"
// import ProUpsell from "@/components/ProUpsell"

import { convertImage } from "../converters/image-converter"


const ExtensionPopup = () => {
	const [quality, setQuality] = useState(80)
	const [maxDimension, setMaxDimension] = useState("")
	const [isProcessing, setIsProcessing] = useState(false)
	const [result, setResult] = useState(null)
	const [isDragging, setIsDragging] = useState(false)
	const dragCounterRef = useRef(0)

	const downloadConvertedFile = fileItem => {
		setTimeout(() => {
			if (fileItem.convertedBlob) {
				const url = URL.createObjectURL(fileItem.convertedBlob)
				const a = document.createElement('a')
				a.href = url
				a.download = fileItem.name.replace(/\.[^/.]+$/, '') + '.' + 'webp'
				a.click()
				URL.revokeObjectURL(url)
			}
		}, 1000)
	}

	const handleFileSelect = async file => {
		let fileItem = {
			id: Date.now(),
			name: file.name,
			size: file.size,
			file: file,
			status: 'processing',
			progress: 0,
			convertedBlob: null
		}

		setIsProcessing(true)
		try {
			const blob = await convertImage(fileItem, quality)

			fileItem = {
				...fileItem,
				name: fileItem.name.replace(/\.[^/.]+$/, '') + '.webp',
				status: 'converted',
				progress: 100,
				originalSize: fileItem.size,
				optimizedSize: blob.size,
				convertedBlob: blob,
				isComplete: true
			}
			setResult(fileItem)

			setIsProcessing(false)
			downloadConvertedFile(fileItem)

		} catch (error) {
			console.error('Error processing file:', error)
			setResult(null)
			setIsProcessing(false)
		}
	}

	const handleDownload = () => {
		if (result && result.convertedBlob) {
			downloadConvertedFile({ ...result, convertedBlob: result.convertedBlob })
		}
	}

	const handleDragEnter = e => {
		e.preventDefault()
		e.stopPropagation()
		dragCounterRef.current += 1
		setIsDragging(true)
	}

	const handleDragLeave = e => {
		e.preventDefault()
		e.stopPropagation()
		dragCounterRef.current -= 1
		if (dragCounterRef.current <= 0) {
			dragCounterRef.current = 0
			setIsDragging(false)
		}
	}

	const handleDragOver = e => {
		e.preventDefault()
		e.stopPropagation()
	}

	const handleDrop = e => {
		e.preventDefault()
		e.stopPropagation()
		dragCounterRef.current = 0
		setIsDragging(false)

		const files = e.dataTransfer.files
		if (files.length > 0) {
			const file = files[0]
			if (file.type.startsWith("image/")) {
				handleFileSelect(file)
			}
		}
	}

	return (
		<Box
			className="w-[360px] overflow-hidden rounded-2xl bg-background relative"
			style={{ boxShadow: 'var(--shadow-popup)' }}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
		>
			<Box px="4" py="4" className="border-b border-muted">
				<Flex align="center" gap="3">
					<CimoLogo size={32} className="rounded-lg" />
					<Box>
						<Text size="3" weight="bold" className="text-dark leading-none tracking-tight">
							Cimo
						</Text>
						&nbsp;
						<Text size="1" className="text-subtle leading-tight mt-0.5">
							Media Optimizer
						</Text>
					</Box>
				</Flex>
			</Box>

			<Box px="4" py="4" className="space-y-4">
				{result && (
					<OptimizationResult
						fileName={result.name}
						originalSize={result.originalSize}
						optimizedSize={result.optimizedSize}
						progress={result.progress}
						isComplete={result.isComplete}
						onDownload={handleDownload}
					/>
				)}

				<DropZone
					onFileSelect={handleFileSelect}
					isProcessing={isProcessing}
					hasResult={result !== null}
					isDragging={isDragging}
				/>

				<SettingsPanel
					quality={quality}
					maxDimension={maxDimension}
					onQualityChange={setQuality}
					onMaxDimensionChange={setMaxDimension}
				/>

				{/* Pro Upsell — temporarily hidden */}
				{/* <ProUpsell /> */}
			</Box>

			<Box px="4" py="3" className="bg-inverse">
				<Text size="1" align="center" className="text-white/60" as="p">
					Free version · Images only · 1 file at a time
				</Text>
			</Box>
		</Box>
	)
}

export default ExtensionPopup
