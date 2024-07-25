import { LeftArrow } from "neetoicons";
import { Typography } from "neetoui";
import { keys } from "ramda";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import useCartItemsStore from "stores/useCartItemsStore";

const Header = ({ title, shouldShowBackButton = true, actionBlock }) => {
  const cartItemsCount = useCartItemsStore(
    store => keys(store.cartItems).length
  );

  const history = useHistory();

  return (
    <div className="m-2">
      <div className="flex items-center">
        {shouldShowBackButton && (
          <LeftArrow
            className="hover:neeto-ui-bg-gray-400 neeto-ui-rounded-full mr-6"
            onClick={history.goBack}
          />
        )}
        <Typography style="h1" weight="semibold">
          {title}
        </Typography>
        <div className="flex flex-col">
          {cartItemsCount > 0 && (
            <span className="neeto-ui-border-black neeto-ui-rounded-full min-w-fit flex h-5 w-5 items-center self-end border p-1">
              {cartItemsCount}
            </span>
          )}
          <AiOutlineShoppingCart size="2rem" />
        </div>
        <div className="flex items-end space-x-4">{actionBlock}</div>
      </div>
      <hr className="neeto-ui-bg-black h-1" />
    </div>
  );
};

export default Header;
