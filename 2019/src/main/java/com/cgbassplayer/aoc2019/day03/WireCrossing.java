package com.cgbassplayer.aoc2019.day03;

import com.cgbassplayer.aoc2019.common.FileLoader;
import javafx.geometry.Point2D;

import java.util.ArrayList;
import java.util.Collections;

public class WireCrossing {
    public static void main(String[] args) {
        ArrayList<int[]> wireAPositions = getWirePositions(FileLoader.loadSingleLineCommaStringFile("input_files" +
                "/day03.txt", 1));
        ArrayList<int[]> wireBPositions = getWirePositions(FileLoader.loadSingleLineCommaStringFile("input_files/day03.txt", 2));

        ArrayList<Integer> distances = getDistances(findAllCrossings(wireAPositions, wireBPositions));

        System.out.println("Shortest distance: " + Collections.min(distances));
    }

    public static ArrayList<int[]> getWirePositions(ArrayList<String> wire) {
        ArrayList<int[]> wirePositions = new ArrayList<>();
        Point2D point = new Point2D(0, 0);

        for (String s : wire) {
            switch (s.charAt(0)) {
                case 'U':
                    for (int i = 0; i < Integer.parseInt(s.substring(1)); i++) {
                        point = point.add(0, 1);
                        wirePositions.add(new int[]{(int) point.getX(), (int) point.getY()});
                    }
                    break;
                case 'D':
                    for (int i = 0; i < Integer.parseInt(s.substring(1)); i++) {
                        point = point.subtract(0, 1);
                        wirePositions.add(new int[]{(int) point.getX(), (int) point.getY()});
                    }
                    break;
                case 'L':
                    for (int i = 0; i < Integer.parseInt(s.substring(1)); i++) {
                        point = point.subtract(1, 0);
                        wirePositions.add(new int[]{(int) point.getX(), (int) point.getY()});
                    }
                    break;
                case 'R':
                    for (int i = 0; i < Integer.parseInt(s.substring(1)); i++) {
                        point = point.add(1, 0);
                        wirePositions.add(new int[]{(int) point.getX(), (int) point.getY()});
                    }
                    break;
            }
        }

        return wirePositions;
    }

    public static ArrayList<int[]> findAllCrossings(ArrayList<int[]> wireA, ArrayList<int[]> wireB) {
        ArrayList<int[]> crossingPoints = new ArrayList<>();
        for (int[] a : wireA) {
            if (a[0] != 0 && a[1] != 0) {
                for (int[] b : wireB) {
                    if (a[0] == b[0] && a[1] == b[1]) {
                        crossingPoints.add(new int[]{a[0], a[1]});
                    }
                }
            }
        }
        return crossingPoints;
    }

    public static ArrayList<Integer> getDistances(ArrayList<int[]> crossings) {
        ArrayList<Integer> distances = new ArrayList<>();
        for (int[] crossing : crossings) {
            distances.add(Math.abs(crossing[0]) + Math.abs(crossing[1]));
        }
        return distances;
    }
}
