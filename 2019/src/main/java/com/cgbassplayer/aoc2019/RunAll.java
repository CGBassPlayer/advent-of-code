package com.cgbassplayer.aoc2019;

import com.cgbassplayer.aoc2019.days.*;

public class RunAll {
    public static void main(String[] args) {
        Day01 day01 = new Day01(1, "The Tyranny of the Rocket Equation");
        Day02 day02 = new Day02(2, "1202 Program Alarm");
        Day04 day04 = new Day04(4, "Secure Container");

        day01.solve();
        day02.solve();
        day04.solve();
    }
}
