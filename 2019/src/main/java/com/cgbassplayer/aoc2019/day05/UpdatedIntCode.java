package com.cgbassplayer.aoc2019.day05;

import com.cgbassplayer.aoc2019.common.*;

public class UpdatedIntCode {
    public static void main(String[] args) {
        IntCodePC pc = new IntCodePC(FileLoader.loadCommaIntFile("input_files/day05.txt"));

        pc.runOpcode();
    }
}
