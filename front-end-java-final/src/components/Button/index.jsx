function Button({ children }) {
    return (
        <button className="bg-btn-primary pl-4 text-white pr-4 p-2 rounded-3xl hover:brightness-125">{children}</button>
    );
}

export default Button;
