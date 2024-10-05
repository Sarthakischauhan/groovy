import * as React from "react"

import { cn } from "@/lib/utils";


/* Should be a simple frontend component, that has the following 
    An image
    A Title
    A description
    A tag  
*/

// Same as Card implementation of Shadcn
const Tile = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({className, ...props} , ref) => (
    <div ref={ref}
    className={cn(
        "rounded-xl bg-card text-card-foreground shadow", className
    )}
    {...props}
    />
))
Tile.displayName = "Tile";

// Implementing the image of the tile
const TileImage = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
    <div ref={ref} 
    className={cn(
        "w-full"
    )}
    {...props}
    />
))
TileImage.displayName = "TileImage";

export { Tile, TileImage };