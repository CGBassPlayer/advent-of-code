package com.cgbassplayer.aoc2019.days;

import com.cgbassplayer.aoc2019.common.Day;

public class Day01 extends Day<Integer, Integer> {
    public Day01(int dayNumber, String title) {
        super(dayNumber, title);
    }

    @Override
    protected Integer partOne() {
        int totalFuel = 0;

        for (String mass : multiLineInput) {
            totalFuel += calculateFuel(Integer.parseInt(mass));
        }
        return totalFuel;
    }

    @Override
    protected Integer partTwo() {
        int totalFuel = 0;

        for (String mass : multiLineInput) {
            int fuel = calculateFuel(Integer.parseInt(mass));
            while (Math.floor(fuel) >= 0) {
                totalFuel += fuel;
                fuel = calculateFuel(fuel);
                if (fuel < 0) {
                    break;
                }
            }
        }

        return totalFuel;
    }

    private int calculateFuel(int mass) {
        return (int) Math.floor(mass / 3f) - 2;
    }
}
