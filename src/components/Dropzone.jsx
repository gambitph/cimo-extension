import { useState, useRef } from "react"
import { Upload, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const DropZone = ( {
	onFileSelect, isProcessing, hasResult
} ) => {
	const [isDragging, setIsDragging] = useState( false )
	const inputRef = useRef < HTMLInputElement > ( null )

	const handleDragOver = e => {
		e.preventDefault()
		e.stopPropagation()
		setIsDragging( true )
	}

	const handleDragLeave = e => {
		e.preventDefault()
		e.stopPropagation()
		setIsDragging( false )
	}

	const handleDrop = e => {
		e.preventDefault()
		e.stopPropagation()
		setIsDragging( false )

		const files = e.dataTransfer.files
		if ( files.length > 0 ) {
			const file = files[0]
			if ( file.type.startsWith( "image/" ) ) {
				onFileSelect( file )
			}
		}
	}

	const handleFileSelect = e => {
		const files = e.target.files
		if ( files && files.length > 0 ) {
			onFileSelect( files[0] )
		}
		// Reset input so same file can be selected again
		if ( inputRef.current ) {
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

			{/* Expanded drop zone when dragging or no result */}
			{( isDragging || !hasResult ) && (
				<div
					className={`
            relative border-2 border-dashed rounded-xl p-6 transition-all duration-300
            ${isDragging
					? "border-primary bg-cimo-dropzone-active scale-[1.02]"
					: "border-border bg-cimo-dropzone hover:border-primary/50"
				}
            ${hasResult ? "animate-scale-in" : ""}
          `}
				>
					<div className="flex flex-col items-center justify-center text-center space-y-3">
						<div
							className={`
                p-3 rounded-full transition-all duration-300
                ${isDragging ? "bg-primary/20 cimo-gradient" : "bg-muted"}
              `}
						>
							{isDragging ? (
								<Upload className="w-6 h-6 text-primary-foreground animate-pulse-soft" />
							) : (
								<ImageIcon className="w-6 h-6 text-muted-foreground" />
							)}
						</div>

						{isDragging ? (
							<p className="text-sm font-medium text-primary">
								Drop your image here
							</p>
						) : (
							<>
								<div className="space-y-1">
									<p className="text-sm font-medium text-foreground">
										Drop an image here
									</p>
									<p className="text-xs text-muted-foreground">or</p>
								</div>
								<Button
									onClick={handleClick}
									disabled={isProcessing}
									variant="default"
									size="sm"
									className="cimo-gradient text-primary-foreground hover:opacity-90 transition-opacity"
								>
									<Upload className="w-4 h-4 mr-2" />
									Select Image
								</Button>
								<p className="text-[10px] text-muted-foreground">
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
						className="text-xs hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
					>
						<Upload className="w-3 h-3 mr-1.5" />
						Optimize Another Image
					</Button>
				</div>
			)}

			{/* Floating drop overlay */}
			{isDragging && hasResult && (
				<div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center animate-scale-in">
					<div className="border-2 border-dashed border-primary rounded-2xl p-12 bg-cimo-dropzone-active">
						<div className="flex flex-col items-center space-y-3">
							<div className="p-4 rounded-full cimo-gradient animate-pulse-soft">
								<Upload className="w-8 h-8 text-primary-foreground" />
							</div>
							<p className="text-lg font-semibold text-primary">
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
