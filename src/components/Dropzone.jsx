import { useState, useRef } from "react"
import { Upload, Image as ImageIcon } from "lucide-react"
import { Button } from "@radix-ui/themes"

const DropZone = ({
	onFileSelect, isProcessing, hasResult
}) => {
	const [isDragging, setIsDragging] = useState(false)
	const inputRef = useRef(null)

	const handleDragOver = e => {
		e.preventDefault()
		e.stopPropagation()
		setIsDragging(true)
	}

	const handleDragLeave = e => {
		e.preventDefault()
		e.stopPropagation()
		setIsDragging(false)
	}

	const handleDrop = e => {
		e.preventDefault()
		e.stopPropagation()
		setIsDragging(false)

		const files = e.dataTransfer.files
		if (files.length > 0) {
			const file = files[0]
			if (file.type.startsWith("image/")) {
				onFileSelect(file)
			}
		}
	}

	const handleFileSelect = e => {
		const files = e.target.files
		if (files && files.length > 0) {
			onFileSelect(files[0])
		}
		// Reset input so same file can be selected again
		if (inputRef.current) {
			inputRef.current.value = ""
		}
	}

	const handleClick = () => {
		inputRef.current?.click()
	}

	return (
		<div
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
			className="relative"
		>
			<input
				ref={inputRef}
				type="file"
				accept="image/*"
				onChange={handleFileSelect}
				className="hidden"
			/>

			{/* Expanded drop zone when dragging and no optimized file yet */}
			{(isDragging || !hasResult) && (
				<div
					className={`
						border-gray relative border-2 border-dashed rounded-xl p-6 transition-all duration-300 bg-primary-light
						${isDragging && "border-primary scale-[1.02]"}
					` }
				>
					<div className="flex flex-col items-center justify-center text-center space-y-3 min-h-60 text-dark">
						{isDragging ? (
							<Upload className="w-10 h-10" />
						) : (
							<ImageIcon className="w-10 h-10" />
						)}

						{isDragging ? (
							<p className="text-sm font-medium">
								Drop your image here
							</p>
						) : (
							<>
								<div className="space-y-1">
									<p className="text-sm font-medium">
										Drop an image here to optimize it to WebP format
									</p>
									<p className="text-[10px]">or</p>
								</div>
								<Button
									onClick={handleClick}
									loading={isProcessing}
									variant="solid"
									size="2"
									color="cyan"
									className="hover:opacity-90 transition-opacity py-2 rounded-full"
								>
									<Upload className="w-6 h-6 text-muted" />
									Select Image
								</Button>
								<p className="text-[10px] mt-2">
									PNG, JPG, GIF, WEBP supported
								</p>
							</>
						)}
					</div>
				</div>
			)}

			{/* Compact button when there's a result */}
			{hasResult && !isDragging && (
				<div className="flex justify-center pt-2">
					<Button
						onClick={handleClick}
						disabled={isProcessing}
						variant="outline"
						size="sm"
						color="cyan"
						className="text-xs text-primary transition-all"
					>
						<Upload className="w-6 h-6" />
						Optimize Another Image
					</Button>
				</div>
			)}

			{/* Floating drop overlay when there's a result */}
			{isDragging && hasResult && (
				<div className="fixed inset-0 bg-background backdrop-blur-sm z-50 flex items-center justify-center animate-scale-in text-dark">
					<div className="border-2 border-dashed border-primary rounded-2xl p-12 bg-primary-light">
						<div className="flex flex-col items-center space-y-3">
							<div className="p-4 rounded-full animate-pulse-soft">
								<Upload className="w-10 h-10 " />
							</div>
							<p className="text-lg font-semibold">
								Drop your image
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default DropZone
