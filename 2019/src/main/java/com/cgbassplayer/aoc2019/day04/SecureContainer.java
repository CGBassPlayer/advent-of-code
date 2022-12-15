package com.cgbassplayer.aoc2019.day04;

import com.cgbassplayer.aoc2019.common.FileLoader;

import java.util.ArrayList;

public class SecureContainer {
    public static void main(String[] args) {
        ArrayList<Integer> range = FileLoader.loadNewLineIntFile("input_files/day04.txt");
        ArrayList<Integer> solutions = getPossibleSolutions(range.get(0), range.get(1));
        System.out.println("Total possible passwords: " + solutions.size());
    }

    public static ArrayList<Integer> getPossibleSolutions(int low, int high) {
        ArrayList<Integer> totalPasswords = new ArrayList<>();
        for (int i = low; i < high; i++) {
            if (hasAscendingDigits(i) && containsDoubles(i)) {
                totalPasswords.add(i);
            }
        }
        return totalPasswords;
    }

    public static boolean hasAscendingDigits(int number) {
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

    public static boolean containsDoubles(int number) {
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
}
