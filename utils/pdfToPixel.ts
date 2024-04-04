export const pdfToInch = 65;

export const pdfSizeToHtml = (pdfSize: number) => {
	const inchToPixel = 10;

	return `${(pdfSize / pdfToInch) * inchToPixel}%`;
};

export const pdfXCoordinatesToHtml = (pdfSize: number) => {
	const inchToPixel = 11.2;

	return `${(pdfSize / pdfToInch) * inchToPixel}%`;
};

export const pdfYCoordinatesToHtml = (pdfSize: number) => {
	const inchToPixel = 7.72;

	return `${(pdfSize / pdfToInch) * inchToPixel}%`;
};
