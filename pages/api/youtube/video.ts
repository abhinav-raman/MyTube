import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { query } = req;
	try {
		const response = await fetch(
			`https://www.googleapis.com/youtube/v3/videos?key=${process.env.API_KEY}&id=${query["id"]}&part=snippet`
		);
		const responseJson = await response.json();
		return res.status(200).json({
			...responseJson,
		});
	} catch (error: any) {
		return res.status(400).json({
			...error,
		});
	}
}
