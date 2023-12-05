
export default defineNuxtRouteMiddleware((to, from) => {
	if (to.name === 'slug' || to.name === 'about-me' && process.client) {
		// window.scrollTo(0, 0)
	}
});
