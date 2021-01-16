const requireContext = require.context('@/layouts', false, /.*\.vue$/);

const layouts = requireContext.keys()
    .map(file =>
        [file.replace(/(^.\/)|(\.vue$)/g, ''), requireContext(file)]
    )
    .reduce((components, [name, component]) => {
        components[name] = component.default || component
        return components
    }, {});

export default layouts;
