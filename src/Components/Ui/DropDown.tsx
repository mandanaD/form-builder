const DropDown = ({
                      setIsVisible,
                      isVisible
                  }: { setIsVisible: () => void, isVisible: boolean }) => {
    return (
        isVisible && (
            <div
                className="fixed w-full inset-0 bg-black/30 backdrop-blur-[3px] z-[60] xl:hidden"
                onClick={setIsVisible}
            />
        )
    )
}
export default DropDown;