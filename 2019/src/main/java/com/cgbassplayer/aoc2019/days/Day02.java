package com.cgbassplayer.aoc2019.days;

import com.cgbassplayer.aoc2019.common.Day;
import com.cgbassplayer.aoc2019.utils.InputUtils;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public class Day02 extends Day <Integer, Integer> {
    public Day02(int dayNumber, String title) {
        super(dayNumber, title);
    }

    @Override
    protected Integer partOne() {
        List<Integer> code = InputUtils.toIntList(singleLineInput);
        code.set(1, 12);
        code.set(2, 2);
        return runOpCode(code).get(0);
    }

    @Override
    protected Integer partTwo() {
        while(true) {
            List<Integer> code = InputUtils.toIntList(singleLineInput);
            int noun = ThreadLocalRandom.current().nextInt(0, 99);
            int verb = ThreadLocalRandom.current().nextInt(0, 99);
            code.set(1, noun);
            code.set(2, verb);
            int result = runOpCode(code).get(0);
            if (result != 19690720) {
                continue;
            }
            return (100 * noun + verb);
        }
    }

    private List<Integer> runOpCode(List<Integer> intCode) {
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
        return intCode;
    }
}
