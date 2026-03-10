const calculateDimensions = (originalWidth, originalHeight) => {
	let scale = 1
	let width = 'auto'
	let height = 'auto'
	let aspectRatio = 'auto'

	// Apply scale
	let newWidth = originalWidth * scale
	let newHeight = originalHeight * scale

	// Apply custom width/height if specified
	if (width !== 'auto' && typeof width === 'number') {
		newWidth = width
		if (height === 'auto') {
			newHeight = (originalHeight / originalWidth) * newWidth
		}
	}

	if (height !== 'auto' && typeof height === 'number') {
		newHeight = height
		if (width === 'auto') {
			newWidth = (originalWidth / originalHeight) * newHeight
		}
	}

	// Apply aspect ratio (resize then crop to maintain aspect ratio without stretching)
	if (aspectRatio !== 'auto') {
		if (aspectRatio === 'custom') {
			// Custom aspect ratio will be handled by width/height inputs
			return { width: newWidth, height: newHeight }
		}

		const [ratioW, ratioH] = aspectRatio.split(':').map(Number)
		const targetRatio = ratioW / ratioH
		const currentRatio = newWidth / newHeight

		if (Math.abs(currentRatio - targetRatio) > 0.01) { // Only adjust if significantly different
			if (currentRatio > targetRatio) {
				// Image is wider than target ratio
				// Resize to fit height, then crop width
				const targetHeight = newHeight
				const targetWidth = targetHeight * targetRatio
				newWidth = targetWidth
				newHeight = targetHeight
			} else {
				// Image is taller than target ratio
				// Resize to fit width, then crop height
				const targetWidth = newWidth
				const targetHeight = targetWidth / targetRatio
				newWidth = targetWidth
				newHeight = targetHeight
			}
		}
	}

	return { width: Math.round(newWidth), height: Math.round(newHeight) }
}

export const convertImage = async (fileItem, quality) => {
	return new Promise((resolve, reject) => {
		const img = new Image()
		img.onload = async function () {
			const canvas = document.createElement('canvas')

			// Calculate new dimensions based on configuration
			// const formatConfig = config[outputFormat]
			const { width, height } = calculateDimensions(img.width, img.height)

			canvas.width = width
			canvas.height = height
			const ctx = canvas.getContext('2d')

			// Calculate source dimensions for cropping (maintain aspect ratio)
			const sourceAspectRatio = img.width / img.height
			const targetAspectRatio = width / height

			let sourceHeight = img.height, sourceWidth = img.width, sourceX = 0, sourceY = 0

			if (Math.abs(sourceAspectRatio - targetAspectRatio) > 0.01) {
				// Need to crop the source image to match target aspect ratio
				if (sourceAspectRatio > targetAspectRatio) {
					// Source is wider, crop width
					sourceWidth = img.height * targetAspectRatio
					sourceX = (img.width - sourceWidth) / 2 // Center the crop
				} else {
					// Source is taller, crop height
					sourceHeight = img.width / targetAspectRatio
					sourceY = (img.height - sourceHeight) / 2 // Center the crop
				}
			}

			// Draw image with cropping to maintain aspect ratio
			ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, width, height)


			canvas.toBlob(function (blob) {
				if (blob) {
					resolve(blob)
				} else {
					reject(new Error('Failed to convert image'))
				}
			}, 'image/webp', quality / 100)
		}

		img.onerror = () => reject(new Error('Failed to load image'))
		img.src = URL.createObjectURL(fileItem.file)
	})
}