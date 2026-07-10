import { useRef } from "react"
import { Upload, Image as ImageIcon, ArrowRight } from "lucide-react"
import { Box, Button, Flex, Text } from "@radix-ui/themes"

const DropZone = ({
	onFileSelect, isProcessing, hasResult, isDragging
}) => {
	const inputRef = useRef(null)

	const handleFileSelect = e => {
		const files = e.target.files
		if (files && files.length > 0) {
			onFileSelect(files[0])
		}
		if (inputRef.current) {
			inputRef.current.value = ""
		}
	}

	const handleClick = () => {
		inputRef.current?.click()
	}

	return (
		<Box className="relative">
			<input
				ref={inputRef}
				type="file"
				accept="image/*"
				onChange={handleFileSelect}
				className="hidden"
			/>

			{!hasResult && (
				<Box
					className={`
						rounded-2xl border bg-background p-6 transition-colors duration-200
						${isDragging
							? "border-dark ring-2 ring-accent/40"
							: "border-muted hover:border-dark/20"
						}
					`}
				>
					<Flex
						direction="column"
						align="center"
						justify="center"
						gap="4"
						className="min-h-40 text-center"
					>
						<Box className="rounded-full border border-muted p-3">
							{isDragging ? (
								<Upload className="w-5 h-5 text-dark" strokeWidth={1.5} />
							) : (
								<ImageIcon className="w-5 h-5 text-dark" strokeWidth={1.5} />
							)}
						</Box>

						{isDragging ? (
							<Text size="2" weight="bold" className="cimo-label text-dark">
								Drop your image
							</Text>
						) : (
							<>
								<Box>
									<Text size="2" weight="bold" className="cimo-label text-dark">
										Upload a file
									</Text>
									<Text size="2" className="text-subtle mt-2 max-w-[240px] mx-auto block">
										Drop an image here to optimize it to WebP format
									</Text>
								</Box>

								<Button
									onClick={handleClick}
									loading={isProcessing}
									variant="solid"
									size="3"
									radius="medium"
									className="cimo-btn-primary"
								>
									Select Image
									<ArrowRight className="w-4 h-4" />
								</Button>

								<Text size="1" className="text-subtle">
									PNG, JPG, GIF, WEBP supported
								</Text>
							</>
						)}
					</Flex>
				</Box>
			)}

			{hasResult && isDragging && (
				<Box className="rounded-2xl border border-dark ring-2 ring-accent/40 bg-background p-6">
					<Flex
						direction="column"
						align="center"
						justify="center"
						gap="3"
						className="min-h-32 text-center"
					>
						<Box className="rounded-full bg-accent p-3">
							<Upload className="w-5 h-5 text-dark" strokeWidth={1.5} />
						</Box>
						<Text size="2" weight="bold" className="cimo-label text-dark">
							Drop your image
						</Text>
					</Flex>
				</Box>
			)}

			{hasResult && !isDragging && (
				<Flex justify="center" pt="1">
					<Button
						onClick={handleClick}
						disabled={isProcessing}
						variant="outline"
						size="2"
						radius="medium"
						className="border-dark text-dark hover:bg-accent-muted"
					>
						<Upload className="w-4 h-4" />
						Optimize Another
					</Button>
				</Flex>
			)}
		</Box>
	)
}

export default DropZone
