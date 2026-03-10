import {
	Download, Check, FileImage
} from "lucide-react"
import { Button, Progress } from "@radix-ui/themes"


const formatFileSize = bytes => {
	if (bytes < 1024) return `${bytes} B`
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
	return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

const OptimizationResult = ({
	fileName,
	originalSize,
	optimizedSize,
	progress,
	isComplete,
	onDownload,
}) => {
	const savedBytes = originalSize - optimizedSize
	const savedPercentage = originalSize > 0
		? Math.round((savedBytes / originalSize) * 100)
		: 0

	return (
		<div className="border rounded-xl p-4 space-y-3 animate-slide-up text-dark">
			{/* File info header */}
			<div className="flex items-center gap-3">
				<div className="p-2 rounded-lg">
					<FileImage className="w-6 h-6 text-primary" />
				</div>
				<div className="flex-1 min-w-0">
					<p className="text-sm font-medium truncate mb-1">
						{fileName}
					</p>
					<Progress
						value={progress}
						color="grass"
						className={`h-2 ${isComplete ? '[&>div]:bg-success' : ''}`}
					/>
					<div className="flex justify-between text-[10px]">
						<span>{progress}% complete</span>
					</div>
				</div>
				{isComplete && (
					<Check className="w-6 h-6 text-secondary" />
				)}
			</div>

			{/* Stats */}
			{isComplete && (
				<div className="flex items-center justify-between p-3 rounded-lg border border-secondary bg-secondary-light ">
					<div>
						<p className="text-[10px] text-muted-foreground uppercase tracking-wide">
							Size Reduction
						</p>
						<div className="flex items-baseline gap-2">
							<span className="text-lg font-bold text-secondary">
								-{savedPercentage}%
							</span>
							<span className="text-xs">
								(<span className="line-through">
									{formatFileSize(originalSize)}
								</span>
								<span className="mx-1">→</span>
								<span className="text-sm font-semibold">
									{formatFileSize(optimizedSize)}
								</span>)
							</span>
						</div>
					</div>
					<div>
						<button
							onClick={onDownload}
							className="text-secondary hover:text-secondary/60"
						>
							<Download className="w-6 h-6" />
						</button>
					</div>
				</div>

			)}
		</div>
	)
}

export default OptimizationResult
