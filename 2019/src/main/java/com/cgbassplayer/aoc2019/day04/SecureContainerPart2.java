package com.cgbassplayer.aoc2019.day04;

import com.cgbassplayer.aoc2019.common.FileLoader;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.stream.Collectors;

/**
 * SecureContainerPart2.java
 *
 * @author Ryan Goodwin on 12/22/2019.
 */
public class SecureContainerPart2 {
    public static void main(String[] args) {
        ArrayList<Integer> range = FileLoader.loadNewLineIntFile("input_files/day04.txt");
        ArrayList<Integer> solutions = getPossibleSolutions(range.get(0), range.get(1));
        System.out.println("Total possible passwords: " + solutions.size());
    }

    public static ArrayList<Integer> getPossibleSolutions(int low, int high) {
        ArrayList<Integer> totalPasswords = new ArrayList<>();
        for (int i = low; i < high; i++) {
            if (SecureContainer.hasAscendingDigits(i) && hasDoubles(i)) {
                totalPasswords.add(i);
            }
        }
        return totalPasswords;
    }

    private static boolean hasDoubles(int number) {
        return Arrays.stream(String.valueOf(number)
                .split(""))
                .collect(Collectors.groupingBy(s -> s))
                .entrySet()
                .stream()
                .anyMatch((k) -> k.getValue().size() == 2);
    }
}
