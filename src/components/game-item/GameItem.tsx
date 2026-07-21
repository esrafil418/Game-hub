import { Heart, Minus, Plus, Star } from "lucide-react";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addToCartAsync,
  addToCartLocal,
  removeFromCartAsync,
  removeFromCartLocal,
} from "../../store/slices/cartSlice";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

export type GameItemProps = {
  _id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category_id?: number;
  category?: string;
};

export default function GameItem({
  _id,
  name,
  price,
  description,
  image,
  category,
}: GameItemProps) {
  const dispatch = useAppDispatch();

  const [liked, setLiked] = useState(false);

  const cartItems = useAppSelector((state) => state.cart.items);
  const token = useAppSelector((state) => state.auth.token);

  const quantity = cartItems[_id] || 0;

  const handleAddToCart = () => {
    dispatch(addToCartLocal(_id));

    if (token) {
      dispatch(addToCartAsync({ itemId: _id, token }));
    }
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCartLocal(_id));

    if (token) {
      dispatch(removeFromCartAsync({ itemId: _id, token }));
    }
  };

  return (
    <Card
      className="
        group relative overflow-hidden rounded-3xl
        border border-border/50
        bg-background/80 backdrop-blur-xl
        shadow-sm
        transition-all duration-500
        hover:-translate-y-2
        hover:shadow-2xl
		p-0
      "
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="
            h-full w-full object-cover
            transition-transform duration-700
            group-hover:scale-110
          "
        />

        {/* Gradient */}
        <div
          className="
            absolute inset-0
            bg-linear-to-t
            from-black/60
            via-transparent
            to-transparent
          "
        />

        {/* Category */}
        {category && (
          <Badge
            className="
              absolute left-4 top-4
              rounded-full
              bg-white/90
              text-black
              backdrop-blur-md
            "
          >
            {category}
          </Badge>
        )}

        {/* Favorite */}
        <Button
          size="icon"
          variant="secondary"
          onClick={() => setLiked(!liked)}
          className="
            absolute right-4 top-4
            h-10 w-10
            rounded-full
            bg-white/90
            backdrop-blur-md
            shadow-md
            transition-all
            hover:scale-110
			cursor-pointer

          "
        >
          <Heart
            className={`
              h-5 w-5
              transition-colors
              ${liked ? "fill-red-500 text-red-500" : "text-gray-700"}
            `}
          />
        </Button>

        {/* Rating */}
        <div
          className="
            absolute bottom-4 left-4
            flex items-center gap-1
            rounded-full
            bg-black/50
            px-3 py-1.5
            text-sm text-white
            backdrop-blur-md
          "
        >
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          4.5
        </div>

        {/* Cart */}
        <div className="absolute bottom-4 right-4">
          {quantity === 0 ? (
            <Button
              size="icon"
              onClick={handleAddToCart}
              className="
                h-12 w-12
                rounded-full
				bg-white/90
				text-black
				hover:bg-white/80
                shadow-xl
                transition-all
                hover:scale-110
				cursor-pointer
              "
            >
              <Plus className="h-6 w-6" />
            </Button>
          ) : (
            <div
              className="
                flex items-center gap-2
                rounded-full
                bg-white/90
                p-2
                shadow-xl
                backdrop-blur-md
				cursor-pointer
              "
            >
              <Button
                size="icon"
                variant="ghost"
                onClick={handleRemoveFromCart}
                className="
                  h-8 w-8
                  rounded-full
				  cursor-pointer
                "
              >
                <Minus className="h-4 w-4" />
              </Button>

              <span
                className="
                  min-w-5
                  text-center
                  font-bold
                  text-black
                "
              >
                {quantity}
              </span>

              <Button
                size="icon"
                variant="ghost"
                onClick={handleAddToCart}
                className="
                  h-8 w-8
                  rounded-full
				  cursor-pointer
                "
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <CardContent className="space-y-4 p-5">
        <div>
          <h3
            className="
              line-clamp-1
              text-xl
              font-bold
              tracking-tight
            "
          >
            {name}
          </h3>

          <p
            className="
              mt-2
              line-clamp-2
              text-sm
              leading-relaxed
              text-muted-foreground
            "
          >
            {description}
          </p>
        </div>

        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <div>
            <p className="text-xs text-muted-foreground">Price</p>

            <span
              className="
                text-3xl
                font-black
                text-primary
              "
            >
              ${price}
            </span>
          </div>

          {quantity > 0 && (
            <Badge
              variant="secondary"
              className="
                rounded-full
              "
            >
              {quantity} in cart
            </Badge>
          )}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-5 pt-0 border-0 bg-white">
        <Button
          variant="outline"
          className="
            w-full
            rounded-full
            border-2
            py-6
            font-semibold
            transition-all
            duration-300
            hover:bg-primary
            hover:text-primary-foreground
			cursor-pointer
          "
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
