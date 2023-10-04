function Main({ children, className }) {
    return <div className={`${className} pl-10 pr-10 dark:bg-dark-header bg-light-header`}>{children}</div>;
}

export default Main;
