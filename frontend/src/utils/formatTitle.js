const formatTitle = (title) => {
    const spaced = title.replace(/([a-z])([A-Z])/g, '$1 $2');
    return spaced
        .split(/[\s-]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

export default formatTitle;
