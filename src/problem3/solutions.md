# Refactored version

For this solution, I'll assume all necessary resources are imported (custom hooks, type, variables, ...).

For each modification, it includes:

- OLD-version: old version of the block of code.
- Issues: List out the problem of the code and suggest changes.
- NEW-version: new version of the block of code (if any).

# Solution

```tsx
interface WalletBalance {
  currency: string;
  amount: number;
}

/* OLD-version:
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}
*/
/* Issue: Checkout Issues-5.3  ---> Deleted */

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
      /* OLD-version:
            return 20;
        */
      /*  Issues-1:
            In switch-case, because "Zilliqa" and "Neo" have the same return result is 20,
            we can remove `return 20;` of the case "Zilliqa".
        */
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        /* OLD-version:
        if (lhsPriority > -99) {
            if (balance.amount <= 0) {
                return true;
            }
        }
        */
        /*  Issues-2:
            1. The variable `lhsPriority` is not defined.
            2. Based on the target of the filter is filtering the balances with their priority and amount,
            the variable `balancePriority` should be used instead `lhsPriority`.
            3. Also because the target of the filter is filtering the wallet balances that still have money,
            the balance amount should be > 0.
        */
        // NEW-version:
        if (balancePriority > -99) {
          if (balance.amount > 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        /* OLD-version:
        if (leftPriority > rightPriority) {
            return -1;
        } else if (rightPriority > leftPriority) {
            return 1;
        }
        */
        /* Issues-3:
            We can simplify the above code by return `rightPriority - leftPriority` because:
                a. If leftPriority > rightPriority --> rightPriority - leftPriority < 0
                b. If leftPriority < rightPriority --> rightPriority - leftPriority > 0
                c. In the case rightPriority == leftPriority, the function will return 0 --> no sorting is performed, handle missing condition in the old-version.
        */
        // NEW-version:
        return rightPriority - leftPriority;
      });

    /* OLD-version:
  }, [balances, prices]);
  */
    /* Issues-4: 
    The code in useMemo() has no place using `prices` --> delete `prices` from dependency array.
  */
  }, [balances]);

  /* OLD-version:
    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
        return {
            ...balance,
            formatted: balance.amount.toFixed(),
        };
    });

    const rows = sortedBalances.map(
        (balance: FormattedWalletBalance, index: number) => {
            const usdValue = prices[balance.currency] * balance.amount;
            return (
                <WalletRow
                className={classes.row}
                key={index}
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={balance.formatted}
                />
            );
        }
    );
*/
  /* Issues-5:
  Based on the old-version, we can see that the code want to render a list of wallets base on the sorted list of balances `sortedBalances` after formatting. Therefore, we have several issues:
    1. `formattedBalances`, the list of formatted balances is not used when render the list of <WalletRow/>.

    2. Formatting the balances before render the row seperately like the old-version does is unnecessary because we can do it when render. --> delete code of `formattedBalances`.

    3. Because the formatting is just `balance.amount.toFixed()`, we do not need the extra interface `FormattedWalletBalance` for this one when rendering. --> delete interface `FormattedWalletBalance`.

    4. Using `index` as key when rendering list of item is ok but may lead to issues when `sortedBalances` can be changed. I am not sure if `sortedBalances` might be changed or not as it depends on `balances`. --> I prefer making some changes to make the key unique.
*/

  // NEW-version:
  const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
    // correct the type of `balance`
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row} // I cannot find the `classes` elsewhere, so I assume that it is imported from the other files
        key={`wallet-row-${balance.currency}-${index}`} // change for making key unique
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.amount.toFixed()} // formatting the balance's amount
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};
```
