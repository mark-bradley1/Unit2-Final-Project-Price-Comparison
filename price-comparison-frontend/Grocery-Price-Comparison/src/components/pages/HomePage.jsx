const HomePage = () => {
    return (
        <main>
            <div className="main-content">
                <h1 className="title">Welcome to the Grocery Price Comparison Tool!</h1>
                <p>
                    Have you ever looked at your grocery receipt and wondered "Am I paying too much?"
                </p>
                <p>
                    If you have then this tool is for you. It takes all of the guesswork out of grocery shopping.
                    All you need to do is add your local stores and search for an item. 
                </p>
                {/* Lists */}
                <div className="feature-list">
                    <strong>This tool will allow you to:</strong>
                    <ul>
                        <li id="li1">Choose different stores to search their products.</li>
                        <li id="li2">Add items to a cart.</li>
                        <li id="li3">See the items you have selected, separated by store.</li>
                        <li id="li4">View the total from each store.</li>
                        <li id="li5">Remove items from your cart.</li>
                    </ul>
                </div>
            </div>
        </main>
    )
}

export default HomePage;