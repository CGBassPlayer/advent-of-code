package com.cgbassplayer.aoc2019.common;

import lombok.Data;

import java.util.List;

/**
 * @param <T0> Return type for part 1
 * @param <T1> Return type for part 2
 */
@Data
public abstract class Day<T0, T1> {

    private Integer dayNumber;
    protected String title;
    protected List<String> singleLineInput;
    protected List<String> multiLineInput;

    public Day(int dayNumber, String title) {
        this.dayNumber = dayNumber;
        this.title = title;
        this.singleLineInput = InputReader.singleLineInput(dayNumber);
        this.multiLineInput = InputReader.multiLineInput(dayNumber);
    }

    protected abstract T0 partOne();
    protected abstract T1 partTwo();

    public void solve() {
        System.out.println("Day " + dayNumber + ": " + title);
        System.out.println("Part 1: " + partOne());
        System.out.println("Part 2: " + partTwo());
        System.out.println();
    }
}
