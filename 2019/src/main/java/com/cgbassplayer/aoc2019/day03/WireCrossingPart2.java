package com.cgbassplayer.aoc2019.day03;

import com.cgbassplayer.aoc2019.common.FileLoader;

import java.util.ArrayList;
import java.util.Arrays;


public class WireCrossingPart2 {
    public static void main(String[] args) {
        ArrayList<int[]> wireAPositions = WireCrossing.getWirePositions(FileLoader.loadSingleLineCommaStringFile(
                "input_files/day03.txt", 1));
        ArrayList<int[]> wireBPositions = WireCrossing.getWirePositions(FileLoader.loadSingleLineCommaStringFile("input_files/day03.txt", 2));

        ArrayList<int[]> crossings = WireCrossing.findAllCrossings(wireAPositions, wireBPositions);

        System.out.println("Shortest total steps: " + getStepsTo(crossings, wireAPositions, wireBPositions));
    }

    public static int getStepsTo(ArrayList<int[]> intersections, ArrayList<int[]> wireA, ArrayList<int[]> wireB) {
        int smallestStep = -1;
        for (int[] intersection : intersections) {
            int wireASteps, wireBSteps;

            wireASteps = findIndex(wireA, new int[]{intersection[0], intersection[1]});
            wireBSteps = findIndex(wireB, new int[]{intersection[0], intersection[1]});

            System.out.println(smallestStep + ", " + wireASteps + ", " + wireBSteps);

            if ((smallestStep == -1) || (smallestStep > wireASteps + wireBSteps)) {
                smallestStep = wireASteps + wireBSteps;
            }
        }
        return smallestStep;
    }

    private static int findIndex(ArrayList<int[]> array, int[] lookingFor) {
        int index = -3;
        for (int i = 0; i < array.size(); i++) {
            int[] node = new int[]{array.get(i)[0], array.get(i)[1]};
            if (Arrays.equals(node, lookingFor)) {
                index = i + 1;
                break;
            }
        }
        return index;
    }
}
