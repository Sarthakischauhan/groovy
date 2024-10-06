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
        "tile rounded-s bg-card text-card-foreground", className
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
        "flex-none", className
    )}
    {...props}
    />
))
TileImage.displayName = "TileImage";

const TileInfo= React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
    <div ref={ref} 
    className={cn(
        "flex-1", className
    )}
    {...props}
    />
))
TileInfo.displayName = "TileInfo"


export { Tile, TileImage, TileInfo };