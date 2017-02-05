package com.alibaba.weex.uitest.TC_AG;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.util.TestFlow;
import java.util.TreeMap;
import org.junit.Before;
import org.junit.Test;

public class AG_Border_Switch_Border_Style extends TestFlow {
	public AG_Border_Switch_Border_Style() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		TreeMap testMap = new <String, Object> TreeMap();
		testMap.put("testComponet", "AG_Border");
		testMap.put("testChildCaseInit", "AG_Border_Switch_Border_Style");
		testMap.put("step1",new TreeMap(){
			{
				put("click", "solid");
				put("screenshot", "AG_Border_Switch_Border_Style_01_solid");
			}
		});
		testMap.put("step2",new TreeMap(){
			{
				put("click", "dashed");
				put("screenshot", "AG_Border_Switch_Border_Style_02_dashed");
			}
		});
		testMap.put("step3",new TreeMap(){
			{
				put("click", "dotted");
				put("screenshot", "AG_Border_Switch_Border_Style_03_dotted");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
