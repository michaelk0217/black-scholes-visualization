# Black Scholes Visualizer

> [!WARNING]
> This is a work in progress. The UI is not polished. Not supported on mobile devices.

This is a visualizer for the Black Scholes model. It allows you to visualize the price of a call and put option as a function of the spot price and volatility.

## Black Scholes Formula

The Black Scholes formula for a call option is:

$C(S,t) = N(d_1)S - N(d_2)Ke^{-r(T-t)}$

where:

- $d_1 = \frac{ln(\frac{S}{K})+(r+\frac{\sigma^2}{2})(T-t)}{\sigma \sqrt{T-t}}$
- $d_2 = d_1 - \sigma \sqrt{T-t}$

The Black Scholes formula for a put option is:

$P(S,t) = N(-d_2)Ke^{-r(T-t)} - N(-d_1)S$

## Parameters

- $S$: The current stock price (spot price)
- $K$: The strike price of the option
- $T-t$: The time to expiration in years
- $r$: The risk-free interest rate
- $\sigma$: The volatility of the stock's returns

The spot price is the current market price of the underlying asset. The strike price is the price at which the option contract can be exercised. The time to expiration is the amount of time until the option expires. The risk-free rate is usually taken to be the yield on a U.S. government security with maturity closest to the option expiry. The volatility measures the standard deviation of the stock's returns.
