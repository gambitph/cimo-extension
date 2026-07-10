import { useState } from "react"
import { ChevronDown, Settings } from "lucide-react"
import { Badge, Box, Flex, Slider, Text, TextField } from "@radix-ui/themes"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@radix-ui/react-collapsible"

const SettingsPanel = ({
	quality,
	maxDimension,
	onQualityChange,
	onMaxDimensionChange,
}) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
			<CollapsibleTrigger className="flex items-center justify-between w-full px-1 py-2 transition-colors duration-150">
				<Flex align="center" gap="2">
					<Settings className="w-4 h-4 text-subtle" strokeWidth={1.5} />
					<Text size="1" weight="bold" className="cimo-label text-dark">
						Settings
					</Text>
				</Flex>
				<ChevronDown
					className={`w-4 h-4 text-subtle transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
					strokeWidth={1.5}
				/>
			</CollapsibleTrigger>

			<CollapsibleContent className="overflow-hidden data-[state=open]:animate-slide-up">
				<Box className="mt-1 rounded-2xl border border-muted bg-background p-4 space-y-5">
					<Box className="space-y-3">
						<Flex align="center" justify="between">
							<Text as="label" htmlFor="quality" size="1" weight="bold" className="cimo-label text-dark">
								WebP Quality
							</Text>
							<Badge className="bg-accent text-dark font-semibold" size="1" variant="solid">
								{quality}%
							</Badge>
						</Flex>
						<Slider
							id="quality"
							min={0}
							max={100}
							step={1}
							value={[quality]}
							onValueChange={value => onQualityChange(value[0])}
							color="grass"
						/>
						<Text size="1" className="text-subtle">
							Higher quality means larger file size
						</Text>
					</Box>

					<Box className="space-y-2">
						<Text as="label" htmlFor="maxDimension" size="1" weight="bold" className="cimo-label text-dark">
							Max Dimension
						</Text>
						<TextField.Root
							id="maxDimension"
							type="number"
							size="2"
							placeholder="Leave blank for original size"
							value={maxDimension}
							onChange={e => onMaxDimensionChange(e.target.value)}
							className="[&_input]:border-muted"
						/>
						<Text size="1" className="text-subtle">
							Resize images exceeding this width or height
						</Text>
					</Box>
				</Box>
			</CollapsibleContent>
		</Collapsible>
	)
}

export default SettingsPanel
