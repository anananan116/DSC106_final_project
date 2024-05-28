export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.ab713abf.js","imports":["_app/immutable/entry/start.ab713abf.js","_app/immutable/chunks/index.790a588a.js","_app/immutable/chunks/singletons.ce9f7e39.js","_app/immutable/chunks/index.0b4b6aae.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.d8b0c774.js","imports":["_app/immutable/entry/app.d8b0c774.js","_app/immutable/chunks/index.790a588a.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
