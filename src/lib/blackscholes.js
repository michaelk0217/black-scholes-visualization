// blackScholesHighPrecision.js

import { erf } from "mathjs";
import Decimal from "decimal.js";

/**
 * Convert a Decimal x to the standard normal CDF using the error function:
 *   Φ(x) = 0.5 * [1 + erf(x / sqrt(2))]
 * We rely on mathjs.erf(...) to compute the error function.
 */
function normalCDF(decimalX) {
  // We will convert the Decimal to a standard JS number for the erf calculation.
  // This might lose some extended precision, but is simpler for demonstration.
  const xNum = decimalX.toNumber();

  // sqrt(2) as a Decimal
  const sqrt2 = new Decimal(2).sqrt();

  // erf argument
  const arg = new Decimal(xNum).div(sqrt2.toNumber()).toNumber();

  // Calculate erf(arg) as a double
  const erfValue = erf(arg);

  // Convert result back to Decimal
  // Φ(x) = 0.5 * [1 + erf(x / sqrt(2))]
  return new Decimal(0.5).mul(new Decimal(1).add(new Decimal(erfValue)));
}

/**
 * Black-Scholes call price using Decimal.js for high-precision arithmetic.
 * @param {number} S     Spot price
 * @param {number} K     Strike price
 * @param {number} T     Time to maturity (years)
 * @param {number} r     Risk-free interest rate (annualized)
 * @param {number} sigma Volatility (annualized)
 * @returns {number}     Call option price (as a normal JS number)
 */
export function blackScholesCallPriceHP(S, K, T, r, sigma) {
  // Wrap inputs as Decimals.
  const S_ = new Decimal(S);
  const K_ = new Decimal(K);
  const T_ = new Decimal(T);
  const r_ = new Decimal(r);
  const sigma_ = new Decimal(sigma);

  // Handle edge case: T <= 0 => immediate expiry => payoff = max(S - K, 0).
  if (T_.lte(0)) {
    return Math.max(S - K, 0);
  }

  // d1 = [ ln(S/K) + (r + 0.5 * sigma^2) * T ] / [ sigma * sqrt(T) ]
  const lnSK = S_.div(K_).ln(); // ln(S/K)
  const a = r_.add(sigma_.pow(2).mul(0.5)).mul(T_); // (r + 0.5*sigma^2) * T
  const numerator = lnSK.add(a);
  const denominator = sigma_.mul(T_.sqrt());
  const d1 = numerator.div(denominator);

  // d2 = d1 - sigma * sqrt(T)
  const d2 = d1.sub(sigma_.mul(T_.sqrt()));

  // N(d1) and N(d2)
  const Nd1 = normalCDF(d1);
  const Nd2 = normalCDF(d2);

  // e^(-rT)
  const expNegRT = r_.mul(T_).neg().exp();

  // Call formula: S * N(d1) - K e^(-rT) * N(d2)
  const callPrice = S_.mul(Nd1).sub(K_.mul(expNegRT).mul(Nd2));

  // Convert to JavaScript number.
  // If you want to preserve more precision, you could return callPrice.toString().
  return callPrice.toNumber();
}

/**
 * Black-Scholes put price using Decimal.js for high-precision arithmetic.
 * @param {number} S     Spot price
 * @param {number} K     Strike price
 * @param {number} T     Time to maturity (years)
 * @param {number} r     Risk-free interest rate (annualized)
 * @param {number} sigma Volatility (annualized)
 * @returns {number}     Put option price (as a normal JS number)
 */
export function blackScholesPutPriceHP(S, K, T, r, sigma) {
  // Wrap inputs as Decimals.
  const S_ = new Decimal(S);
  const K_ = new Decimal(K);
  const T_ = new Decimal(T);
  const r_ = new Decimal(r);
  const sigma_ = new Decimal(sigma);

  // Handle edge case: T <= 0 => immediate expiry => payoff = max(K - S, 0).
  if (T_.lte(0)) {
    return Math.max(K - S, 0);
  }

  // d1 = [ ln(S/K) + (r + 0.5 * sigma^2) * T ] / [ sigma * sqrt(T) ]
  const lnSK = S_.div(K_).ln();
  const a = r_.add(sigma_.pow(2).mul(0.5)).mul(T_);
  const numerator = lnSK.add(a);
  const denominator = sigma_.mul(T_.sqrt());
  const d1 = numerator.div(denominator);

  // d2 = d1 - sigma * sqrt(T)
  const d2 = d1.sub(sigma_.mul(T_.sqrt()));

  // N(d1), N(d2)
  const Nd1 = normalCDF(d1);
  const Nd2 = normalCDF(d2);

  // e^(-rT)
  const expNegRT = r_.mul(T_).neg().exp();

  // Put formula: K e^(-rT) * [1 - N(d2)] - S * [1 - N(d1)]
  // N(-x) = 1 - N(x)
  const oneMinusNd2 = new Decimal(1).sub(Nd2);
  const oneMinusNd1 = new Decimal(1).sub(Nd1);

  const putPrice = K_.mul(expNegRT).mul(oneMinusNd2).sub(S_.mul(oneMinusNd1));

  return putPrice.toNumber();
}
