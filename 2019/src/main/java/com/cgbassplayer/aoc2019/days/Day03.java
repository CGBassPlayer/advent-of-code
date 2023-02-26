package com.cgbassplayer.aoc2019.days;

import com.cgbassplayer.aoc2019.common.Day;
import com.cgbassplayer.aoc2019.common.Point2D;
import com.cgbassplayer.aoc2019.utils.InputUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class Day03 extends Day<Integer, Integer> {
    public Day03(int dayNumber, String title) {
        super(dayNumber, title);
    }

    @Override
    protected Integer partOne() {
        List<String> wire1 = singleLineInput; // Line 1
        List<String> wire2 = InputUtils.getStringListFromLine(multiLineInput, 1, ",");

        List<Point2D> wire1Positions = getWirePositions(wire1);
        List<Point2D> wire2Positions = getWirePositions(wire2);

        return Collections.min(getDistances(wire1Positions, wire2Positions));
    }

    @Override
    protected Integer partTwo() {
        List<String> wire1 = singleLineInput; // Line 1
        List<String> wire2 = InputUtils.getStringListFromLine(multiLineInput, 1, ",");

        List<Point2D> wire1Positions = getWirePositions(wire1);
        List<Point2D> wire2Positions = getWirePositions(wire2);

        return getStepsTo(wire1Positions, wire2Positions, findAllCrossings(wire1Positions, wire2Positions));
    }

    private List<Point2D> getWirePositions(List<String> wire) {
        Point2D point = new Point2D(0, 0);
        List<Point2D> positions = new ArrayList<>();

        for (String w : wire) {
            switch (w.charAt(0)) {
                case 'U' -> {
                    for (int i = 0; i < Integer.parseInt(w.substring(1)); i++) {
                        point = point.add(0, 1);
                        positions.add(point);
                    }
                }
                case 'D' -> {
                    for (int i = 0; i < Integer.parseInt(w.substring(1)); i++) {
                        point = point.subtract(0, 1);
                        positions.add(point);
                    }
                }
                case 'L' -> {
                    for (int i = 0; i < Integer.parseInt(w.substring(1)); i++) {
                        point = point.subtract(1, 0);
                        positions.add(point);
                    }
                }
                case 'R' -> {
                    for (int i = 0; i < Integer.parseInt(w.substring(1)); i++) {
                        point = point.add(1, 0);
                        positions.add(point);
                    }
                }
            }
        }
        return positions;
    }

    private List<Point2D> findAllCrossings(List<Point2D> wireAPositions, List<Point2D> wireBPositions) {
        return wireAPositions.stream()
                .filter(aPos -> !aPos.equals(new Point2D(0, 0)))
                .filter(wireBPositions::contains)
                .collect(Collectors.toList());
    }

    private List<Integer> getDistances(List<Point2D> crossings) {
        return crossings.stream()
                .map(p -> Math.abs(p.getX().intValue()) + Math.abs(p.getY().intValue()))
                .collect(Collectors.toList());
    }

    private List<Integer> getDistances(List<Point2D> wireAPositions, List<Point2D> wireBPositions) {
        return getDistances(findAllCrossings(wireAPositions, wireBPositions));
    }

    private int getStepsTo(List<Point2D> wireAPositions, List<Point2D> wireBPositions, List<Point2D> intersections) {
        int smallestStep = -1;
        for (Point2D intersection : intersections) {
            int wireASteps, wireBSteps;

            wireASteps = wireAPositions.indexOf(intersection) + 1;
            wireBSteps = wireBPositions.indexOf(intersection) + 1;

            if ((smallestStep == -1) || (smallestStep > wireASteps + wireBSteps)) {
                smallestStep = wireASteps + wireBSteps;
            }
        }
        return smallestStep;
    }
}
