export const pdfToInch = 65;

export const pdfSizeToHtmlWidth = (pdfSize: number) => {
	const inchToPixel = 11;

	return `${(pdfSize / pdfToInch) * inchToPixel}%`;
};

export const pdfSizeToHtmlHeight = (pdfSize: number) => {
	const inchToPixel = 9.2;

	return `${(pdfSize / pdfToInch) * inchToPixel}%`;
};

export const pdfXCoordinatesToHtml = (pdfSize: number) => {
	const inchToPixel = 10.9;

	return `${(pdfSize / pdfToInch) * inchToPixel}%`;
};

export const pdfYCoordinatesToHtml = (pdfSize: number) => {
	const inchToPixel = 7.71;

	return `${(pdfSize / pdfToInch) * inchToPixel}%`;
};
