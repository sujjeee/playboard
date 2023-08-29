export function DrawBoardFooter() {
    return (
        <footer className="absolute bottom-5 md:px-12 px-4 select-none">
            <div className="flex-1 text-left text-sm leading-loose text-muted-foreground">
                Built by{" "}
                <a
                    href="https://twitter.com/sujjeeee"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold transition-colors hover:text-foreground"
                >
                    Sujjeee
                </a>
                .
            </div>
        </footer>
    )
}