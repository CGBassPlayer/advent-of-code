package com.cgbassplayer.aoc2019.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Tuple for mapping coordinates
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Point2D {
    private Double x;
    private Double y;

    public Point2D(Integer x, Integer y) {
        this.x = Double.valueOf(x);
        this.y = Double.valueOf(y);
    }

    /**
     * Returns a point with the specified coordinates added to the coordinates of this point.
     *
     * @param addX amount to add to x coordinate
     * @param addY amount to add to y coordinate
     * @return Point with the specified coordinates added
     */
    public Point2D add(Double addX, Double addY) {
        return new Point2D(this.x + addX, this.y + addY);
    }

    /**
     * Returns a point with the specified coordinates added to the coordinates of this point.
     *
     * @param addX amount to add to x coordinate
     * @param addY amount to add to y coordinate
     * @return Point with the specified coordinates added
     */
    public Point2D add(Integer addX, Integer addY) {
        return new Point2D(this.x + addX, this.y + addY);
    }

    /**
     * Returns a point with the specified coordinates added to the coordinates of this point.
     *
     * @param point values to add to current coordinates
     * @return Point with the specified coordinates added
     */
    public Point2D add(Point2D point) {
        return new Point2D(this.x + point.x, this.y + point.y);
    }

    /**
     * Returns a point with the specified coordinates subtracted from the coordinates of this point.
     *
     * @param subX amount to subtract from x coordinate
     * @param subY amount to subtract from y coordinate
     * @return Specified coordinates subtracted from the coordinates of this point
     */
    public Point2D subtract(Double subX, Double subY) {
        return new Point2D(this.x - subX, this.y - subY);
    }

    /**
     * Returns a point with the specified coordinates subtracted from the coordinates of this point.
     *
     * @param subX amount to subtract from x coordinate
     * @param subY amount to subtract from y coordinate
     * @return Specified coordinates subtracted from the coordinates of this point
     */
    public Point2D subtract(Integer subX, Integer subY) {
        return new Point2D(this.x - subX, this.y - subY);
    }

    /**
     * Returns a point with the specified coordinates subtracted from the coordinates of this point.
     *
     * @param point values to subtract from current coordinates
     * @return Specified coordinates subtracted from the coordinates of this point
     */
    public Point2D subtract(Point2D point) {
        return new Point2D(this.x - point.x, this.y - point.y);
    }
}
