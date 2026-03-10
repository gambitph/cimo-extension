import { Sparkles, ArrowRight } from "lucide-react"

const ProUpsell = () => {
	return (
		<a
			href="https://cimoextension.com"
			target="_blank"
			rel="noopener noreferrer"
			className="group block"
		>
			<div className="relative overflow-hidden rounded-lg bg-linear-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 p-3 hover:border-primary/40 transition-all duration-300">
				{/* Shimmer effect on hover */}
				<div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

				<div className="relative flex items-center gap-3">
					<div className="p-1.5 rounded-full">
						<Sparkles className="w-5 h-5 text-primary" />
					</div>

					<div className="flex-1 min-w-0">
						<p className="text-xs font-semibold ">
							Upgrade to Pro
						</p>
						<p className="text-[10px]">
							Video & audio compression, batch processing
						</p>
					</div>

					<ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform duration-200" />
				</div>
			</div>
		</a>
	)
}

export default ProUpsell
