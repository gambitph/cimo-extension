import { Download, Check, FileImage } from "lucide-react"
import { Box, Flex, IconButton, Progress, Text } from "@radix-ui/themes"

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
	const displayPercentage = Math.abs(savedPercentage)

	return (
		<Box className="rounded-2xl border border-muted p-4 animate-slide-up">
			<Flex align="center" gap="3">
				<Box className="rounded-lg border border-muted p-2 shrink-0">
					<FileImage className="w-5 h-5 text-dark" strokeWidth={1.5} />
				</Box>
				<Box className="flex-1 min-w-0">
					<Text size="2" weight="medium" className="truncate block mb-2 text-dark">
						{fileName}
					</Text>
					<Progress
						value={progress}
						color={isComplete ? "grass" : "gray"}
						size="1"
					/>
					<Text size="1" className="text-subtle mt-1.5">
						{progress}% complete
					</Text>
				</Box>
				{isComplete && (
					<Box className="rounded-full bg-accent p-1 shrink-0">
						<Check className="w-4 h-4 text-dark" strokeWidth={2.5} />
					</Box>
				)}
			</Flex>

			{isComplete && (
				<Box className="mt-4 rounded-xl border border-muted bg-accent-muted p-4">
					<Flex align="center" justify="between">
						<Box>
							<Text size="1" className="cimo-label text-subtle">
								Size reduction
							</Text>
							<Flex align="baseline" gap="2" mt="1" wrap="wrap">
								<Text size="6" weight="bold" className="text-accent leading-none">
									{savedPercentage >= 0 ? '-' : '+'}{displayPercentage}%
								</Text>
								<Text size="1" className="text-subtle">
									<span className="line-through">{formatFileSize(originalSize)}</span>
									{" → "}
									<span className="text-dark font-medium">{formatFileSize(optimizedSize)}</span>
								</Text>
							</Flex>
						</Box>
						<IconButton
							variant="solid"
							size="2"
							radius="medium"
							onClick={onDownload}
							aria-label="Download optimized image"
							className="cimo-btn-primary shrink-0"
						>
							<Download className="w-4 h-4" />
						</IconButton>
					</Flex>
					<p className="text-subtle mt-3 text-[10px] leading-[1.3]">
						Your optimized media has been downloaded automatically.
					</p>
				</Box>
			)}
		</Box>
	)
}

export default OptimizationResult
