package com.cgbassplayer.aoc2019.day02;

import com.cgbassplayer.aoc2019.common.FileLoader;

import java.util.ArrayList;
import java.util.concurrent.ThreadLocalRandom;

public class IntCodesPart2 {
    public static void main(String[] args) {
        while (true) {
            ArrayList<Integer> codeList = FileLoader.loadCommaIntFile("input_files/day02.txt");
            int noun = ThreadLocalRandom.current().nextInt(0, 99);
            int verb = ThreadLocalRandom.current().nextInt(0, 99);
            codeList.set(1, noun);
            codeList.set(2, verb);
            int result = IntCodes.runOpcode(codeList).get(0);
            if (result != 19690720) continue;
            System.out.println(100 * noun + verb);
            break;
        }
    }
}
