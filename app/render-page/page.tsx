'use client';

import $api from '@/api';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface IInstance {
	_id: string;
	documentId: string;
	documentUrl: string;
	documentName: string;
	pages: { fileName: string; url: string }[];
	fields: Object[];
	createdAt: Date;
}

const LoadPDF = () => {
	const [instance, setInstance] = useState<IInstance>();

	useEffect(() => {
		const getInstance = async () => {
			const { data } = await $api.get('/docs/contract');

			setInstance(data);
		};

		getInstance();
	}, []);

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
				<div
					style={{
						display: 'flex',
						marginTop: '1rem',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					DocsSign SMT
				</div>

				{instance?.pages.map(({ fileName, url }) => (
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
							style={{
								top: 0,
								right: 0,
								left: 0,
								bottom: 0,
								position: 'absolute'
							}}
						>
							{' '}
						</div>
					</div>
				))}
			</div>
		</main>
	);
};

export default LoadPDF;
