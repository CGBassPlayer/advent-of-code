package com.cgbassplayer.aoc2019.days;

import com.cgbassplayer.aoc2019.common.Day;
import com.cgbassplayer.aoc2019.utils.InputUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Day04 extends Day<Integer, Integer> {
    public Day04(int dayNumber, String title) {
        super(dayNumber, title);
    }

    @Override
    protected Integer partOne() {
        List<Integer> solutions = new ArrayList<>();
        List<Integer> range = InputUtils.toIntList(multiLineInput);
        for (int i = range.get(0); i < range.get(1); i++) {
            if (hasAscendingDigits(i) && containsDoubles(i)) {
                solutions.add(i);
            }
        }
        return solutions.size();
    }

    @Override
    protected Integer partTwo() {
        List<Integer> solutions = new ArrayList<>();
        List<Integer> range = InputUtils.toIntList(multiLineInput);
        for (int i = range.get(0); i < range.get(1); i++) {
            if (hasAscendingDigits(i) && hasDoubles(i)) {
                solutions.add(i);
            }
        }
        return solutions.size();
    }

    private ArrayList<Integer> getPossibleSolutions(int low, int high) {
        ArrayList<Integer> totalPasswords = new ArrayList<>();
        for (int i = low; i < high; i++) {
            if (hasAscendingDigits(i) && containsDoubles(i)) {
                totalPasswords.add(i);
            }
        }
        return totalPasswords;
    }

    private boolean hasAscendingDigits(int number) {
        String num = String.valueOf(number);
        for (int i = 0; i < num.length(); i++) {
            int j;
            if (i - 1 == -1) {
                j = 0;
            } else {
                j = Character.digit(num.charAt(i - 1), 10);
            }
            int k = Character.digit(num.charAt(i), 10);
            int l;
            if (i + 1 == num.length()) {
                l = 9;
            } else {
                l = Character.digit(num.charAt(i + 1), 10);
            }

            if (j > k || k > l) {
                return false;
            }
        }
        return true;
    }

    private boolean containsDoubles(int number) {
        String num = String.valueOf(number);
        for (int i = 1; i < num.length() - 1; i++) {
            int preDigit = Character.digit(num.charAt(i - 1), 10);
            int digit = Character.digit(num.charAt(i), 10);
            int postDigit = Character.digit(num.charAt(i + 1), 10);

            if (preDigit == digit || digit == postDigit) {
                return true;
            }
        }
        return false;
    }

    private boolean hasDoubles(int number) {
        return Arrays.stream(String.valueOf(number)
                .split(""))
                .collect(Collectors.groupingBy(s -> s))
                .entrySet()
                .stream()
                .anyMatch((k) -> k.getValue().size() == 2);
    }
}
