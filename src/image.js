import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import fs from 'fs/promises';

const files = await imagemin(
	['src/images/**/*.{jpg,jpeg,png,jfif}'],
	{
		destination: 'public/assets/images',
		plugins: [
			imageminWebp({ quality: 100 })
		]
	}
);


await Promise.all(
	files.map(file => fs.unlink(file.sourcePath))
);