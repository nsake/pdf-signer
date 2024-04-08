'use client';

import $api from '@/api';
import {
	pdfSizeToHtmlHeight,
	pdfSizeToHtmlWidth,
	pdfXCoordinatesToHtml,
	pdfYCoordinatesToHtml
} from '@/utils/pdfToPixel';
import Image from 'next/image';
import { useEffect, useState } from 'react';
interface IPropery {
	y: number;
	x: number;
	width: number;
	height: number;
	borderWidth: number;
	backgroundColor: any;
	textColor: any;
	borderColor: any;
}

interface IInstance {
	_id: string;
	documentId: string;
	documentUrl: string;
	documentName: string;
	pages: { fileName: string; url: string }[];
	fields: { page: number; name: string; properties: IPropery }[];
	createdAt: Date;
}

const LoadPDF = () => {
	const [instance, setInstance] = useState<IInstance>();

	useEffect(() => {
		const getInstance = async () => {
			const { data } = (await $api.get('/docs/contract')) as {
				data: IInstance;
			};

			setInstance(data);
		};

		getInstance();
	}, []);

	useEffect(() => {
		if (instance) {
			instance?.fields.map(({ page, name, properties }) => {
				const container = document.getElementById(`instance-${page}`);
				const divElement = document.createElement('div');

				const isExistingDiv = document.getElementById(name);

				if (container && !isExistingDiv) {
					divElement.id = name;

					divElement.style.position = 'absolute';

					divElement.style.left = pdfXCoordinatesToHtml(properties.x);
					divElement.style.bottom = pdfYCoordinatesToHtml(properties.y);

					divElement.style.height = pdfSizeToHtmlHeight(properties.height);
					divElement.style.width = pdfSizeToHtmlWidth(properties.width);

					divElement.className = 'input_field';

					container.append(divElement);
				}
			});
		}
	}, [instance]);

	return (
		<main
			style={{
				width: '100vw',
				height: '100vh',
				maxHeight: '-webkit-fill-available'
			}}
		>
			<div
				style={{
					maxWidth: '1000px',
					marginLeft: 'auto',
					marginRight: 'auto',
					paddingBottom: '18rem'
				}}
			>
				<h2 className='title'>Document Sign</h2>

				{instance?.pages.map(({ fileName, url }, idx) => (
					<div
						key={url}
						style={{
							boxShadow:
								'var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)',
							marginBottom: '1rem',
							marginTop: '1rem',
							position: 'relative'
						}}
					>
						<Image
							alt={fileName}
							width={1400}
							height={1980}
							loading='lazy'
							src={url}
							style={{
								height: 'auto',
								maxWidth: '100%',
								display: 'block',
								verticalAlign: 'middle'
							}}
						/>

						<div
							id={`instance-${idx + 1}`}
							style={{
								top: 0,
								right: 0,
								left: 0,
								bottom: 0,
								position: 'absolute'
							}}
						></div>
					</div>
				))}
			</div>
		</main>
	);
};

export default LoadPDF;
