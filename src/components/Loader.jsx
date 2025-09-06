export default function Loader({ 
    isEnabled,
    className = ""
 }) {
    if (!isEnabled) return null; 

    return (
        <div className={`w-full h-screen flex fixed top-0 left-0 items-center justify-center bg-neutral-900 opacity-100 z-50 ${className}`}>
            <div className="loader"></div>
        </div>
    );
}
