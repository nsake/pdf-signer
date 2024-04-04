'use client';
import { pdf } from '@react-pdf/renderer';
import { PDFDocument, PDFField, rgb } from 'pdf-lib';
import { useEffect, useRef, useState } from 'react';

const firstPageFields = (doc: PDFDocument) => {
	const firstPage = doc.getPage(0);
	const form = doc.getForm();

	form.createTextField('first_line.city').addToPage(firstPage, {
		y: 749,
		x: 143,
		width: 70,
		height: 10,
		borderWidth: 0,
		backgroundColor: rgb(1, 1, 1)
	});
};

//*
// computedStyle() {
//                 const {x: e, y: t, w: i, h: a} = this.area;
//                 return {
//                     top: 100 * t + "%",
//                     left: 100 * e + "%",
//                     width: 100 * i + "%",
//                     height: 100 * a + "%"
//                 }
//             }
//

const LoadPDF = () => {
	const ref = useRef();
	const [pdfDoc, setPDFDoc] = useState<PDFDocument>();
	const [pdfInfo, setPdfInfo] = useState<string>();

	useEffect(() => {
		modifyPdf();
	}, []);

	const modifyPdf = async () => {
		const existingPdfBytes = await fetch(
			'https://crm-storm-traffic.s3.amazonaws.com/20.00.51%202024/04/02-1.%20%C3%90%C2%94%C3%90%C2%BE%C3%90%C2%B3%C3%90%C2%BE%C3%90%C2%B2%C3%90%C2%BE%C3%91%C2%80%20%C3%90%C2%9F%C3%91%C2%80%C3%90%C2%B8%C3%90%C2%BC%C3%90%C2%B5%C3%91%C2%80.pdf'
		).then((res) => res.arrayBuffer());

		const pdfDoc = await PDFDocument.load(existingPdfBytes);

		firstPageFields(pdfDoc);

		const form = pdfDoc.getForm();
		const fields = form.getFields();

		const hashFields: Record<
			string,
			{
				field: PDFField;
				properties: {
					x: number;
					y: number;
					width: number;
					height: number;
				};
			}
		> = {};

		const formElement = document.getElementById('form');

		const a4Page = document.createElement('page-a4');
		const ifExistsA4Page = document.getElementById('a4-page');

		if (!ifExistsA4Page) {
			a4Page.id = 'a4-page';

			a4Page.style.width = '21cm';
			a4Page.style.height = '29.6cm';
			a4Page.style.position = 'absolute';
			a4Page.style.margin = '0 auto';
			a4Page.style.top = '6px';

			formElement?.append(a4Page);
		}

		const ifExists = document.getElementById('div-1');

		const pdfToPixel = (pdfSize: number) => {
			const pdfToInch = 72;

			const inchToPixel = 96;

			return `${(pdfSize / pdfToInch) * inchToPixel}px`;
		};

		const newDiv = document.createElement('div');

		const ifExistsA4PageForDiv = document.getElementById('a4-page');

		if (!ifExists && ifExistsA4PageForDiv) {
			newDiv.id = 'div-1';

			newDiv.style.width = pdfToPixel(70);
			newDiv.style.position = 'absolute';
			newDiv.style.left = pdfToPixel(143);
			newDiv.style.bottom = pdfToPixel(749);
			newDiv.style.height = pdfToPixel(10);
			newDiv.style.background = 'white';

			ifExistsA4PageForDiv?.append(newDiv);
		}

		fields.forEach((field) => {
			const name = field.getName();
			const widgets = field.acroField.getWidgets();
			const properties = widgets[0].getRectangle();

			hashFields[name] = { field, properties };
		});

		setPDFDoc(pdfDoc);

		const pdfBytes = await pdfDoc.save({
			updateFieldAppearances: true
		});

		const bytes = new Uint8Array(pdfBytes);
		const blob = new Blob([bytes], { type: 'application/pdf' });
		const docUrl = `${URL.createObjectURL(blob)}#toolbar=0&navpanes=0`;

		setPdfInfo(docUrl as any);
	};

	return (
		<main
			style={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<div
				id='form'
				style={{
					width: '100vw',
					height: '100vh',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					position: 'relative'
				}}
			>
				<iframe
					ref={ref as any}
					name='pdf'
					id='pdf'
					style={{ width: '100%', height: '100%' }}
					src={pdfInfo as any}
				/>
			</div>
		</main>
	);
};

// const LoadPDFPage = () => {
// 	return (
// 		<main
// 			style={{
// 				width: '100vw',
// 				height: '100vh',
// 				display: 'flex',
// 				justifyContent: 'center',
// 				alignItems: 'center'
// 			}}
// 		></main>
// 	);
// };

export default LoadPDF;
