export const handleWatchlistButtonHover = (watchlistButton) => {

  if(watchlistButton.current) {
    watchlistButton.current.textContent = "Registered Users Only"
    watchlistButton.current.classList.add("alert")
  }
}

export const handleWatchlistButtonLeave = (watchlistButton) => {
  if (watchlistButton.current) {
    watchlistButton.current.textContent = "+ Watchlist"
    watchlistButton.current.classList.remove("alert")
  }
};