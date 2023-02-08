import { fail } from '@sveltejs/kit';

/** @type {{ title: string; desc?: string }[]} */
const todo_list = [];

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
	return { todo_list };
};

/** @type {import('./$types').Actions} */
export const actions = {
	async default({ request }) {
		const form_data = await request.formData();
		const title = form_data.get('title')?.toString();
		if (!title) return fail(400, { message: 'Title is required' });

		const desc = form_data.get('desc')?.toString();
		todo_list.push({ title, desc });
		return { success: true };
	}
};
