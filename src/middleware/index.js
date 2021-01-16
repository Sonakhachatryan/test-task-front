// Load middleware modules dynamically.
const middlewares = resolveMiddleware(
    require.context('@/middleware', false, /.*\.js$/)
)

function resolveMiddleware (requireContext) {
    return requireContext.keys()
        .map(file =>
            [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]
        )
        .reduce((guards, [name, guard]) => (
            { ...guards, [name]: guard.default }
        ), {})
}

export default middlewares
