package com.cgbassplayer.aoc2019.day02;

import com.cgbassplayer.aoc2019.common.FileLoader;

import java.util.ArrayList;

public class IntCodes {
    public static void main(String[] args) {
        ArrayList<Integer> code = FileLoader.loadCommaIntFile("input_files/day02.txt");
        code.set(1, 12);
        code.set(2, 2);

        System.out.println(runOpcode(code).get(0));
    }

    /**
     * Process Intcodes as specified at https://adventofcode.com/2019/day/2
     *
     * @param intCode ArrayList of opcodes to be processed
     * @return ArrayList of opcodes after they have been matched
     */
    static ArrayList<Integer> runOpcode(ArrayList<Integer> intCode) {
        //System.out.println("Start Code" + intCode);
        for (int i = 0; i < intCode.size(); i += 4) {
            switch (intCode.get(i)) {
                case 99:
                    break;
                case 1:
                    intCode.set(intCode.get(i + 3),
                            intCode.get(intCode.get(i + 1)) + intCode.get(intCode.get(i + 2)));
                    break;
                case 2:
                    intCode.set(intCode.get(i + 3),
                            intCode.get(intCode.get(i + 1)) * intCode.get(intCode.get(i + 2)));
                    break;
            }
        }
        //System.out.println("End Code: " + intCode);
        return intCode;
    }
}
