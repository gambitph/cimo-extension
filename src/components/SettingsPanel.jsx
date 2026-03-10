import { useState } from "react"
import { ChevronDown, Settings } from "lucide-react"
import { Slider } from "@radix-ui/themes"
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
			<CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-dark hover:bg-muted/30 rounded-lg transition-all duration-200">
				<div className="flex items-center gap-2">
					<Settings className="w-4 h-4" />
					<span>Settings</span>
				</div>
				<ChevronDown
					className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
				/>
			</CollapsibleTrigger>

			<CollapsibleContent className="overflow-hidden data-[state=open]:animate-slide-up">
				<div className="px-5 py-3 space-y-5 bg-muted/30 rounded-lg mt-2">
					{/* WebP Quality Slider */}
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<label htmlFor="quality" className="text-xs font-medium">
								WebP Quality
							</label>
							<span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
								{quality}%
							</span>
						</div>
						<Slider
							id="quality"
							min={0}
							max={100}
							step={1}
							value={[quality]}
							onValueChange={value => onQualityChange(value[0])}
							className="w-full"
							color="cyan"
						/>
						<p className="text-[10px] text-muted-foreground">
							Higher quality = larger file size
						</p>
					</div>

					{/* Max Dimension Input */}
					<div className="space-y-2">
						<label htmlFor="maxDimension" className="text-xs font-medium">
							Max Dimension (px)
						</label>
						<br />
						<input
							id="maxDimension"
							type="number"
							placeholder="Leave blank for original size"
							value={maxDimension}
							onChange={e => onMaxDimensionChange(e.target.value)}
							className="flex h-6 w-full rounded-md border border-dark bg-background px-3 py-3 text-xs placeholder:text-dark/50"
						/>
						<p className="text-[10px] text-muted-foreground">
							Resize images exceeding this width/height
						</p>
					</div>
				</div>
			</CollapsibleContent>
		</Collapsible>
	)
}

export default SettingsPanel
